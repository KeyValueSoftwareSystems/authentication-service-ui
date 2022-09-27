
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './styles.css';
import { useNavigate, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from 'muicss/lib/react/button';
import { useMutation, useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../states/userStates';
import { CREATE_USER, UPDATE_USER, UPDATE_USER_GROUPS } from './services/mutations';
import { GET_GROUPS, GET_USER, GET_USER_GROUPS } from './services/queries';
import { groupListAtom, userGroupsAtom } from '../../states/groupStates';
import { ChecklistComponent } from '../../components/CheckList/checklist';
import FormInputText from "../../components/InputText";
import { UserformSchema } from "./userSchema";
import { yupResolver } from "@hookform/resolvers/yup";


const UserForm: React.FC = () => {

    const navigate = useNavigate();
    let { id } = useParams();

    const [groupList, setGroupList] = useRecoilState(groupListAtom);
    const [userGroupList, setUserGroup] = useRecoilState(userGroupsAtom);

    useQuery(GET_USER_GROUPS, {
        variables: { id },
        onCompleted: (data) => {
            data?.getUserGroups.map((item: any) => setUserGroup([...userGroupList, item.id]));
        }
    });

    useQuery(GET_GROUPS, {
        onCompleted: (data) => {
            setGroupList(data?.getGroups);
        }
    });

    const currentIDs: string[] = [];
    userGroupList.map((item) => currentIDs.push(item));

    const setTitle = () => {
        if (id) {
            return "Modify User";
        }
        else {
            return "Add User"
        }
    }
    const setButton = () => {
        if (id) {
            return "Update";
        }
        else {
            return "Add";
        }
    }

    const [user, setUser] = useRecoilState(userAtom);
    const [userGroupsID, setUserGroups] = useRecoilState(userGroupsAtom);

    useQuery(GET_USER, {
        variables: { id },
        onCompleted: (data) => {
            setUser(data?.getUser);
        }
    }
    );

    const initialValues = {
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    }

    const initialUpdateValues = {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        password: user.password,
    }
    const initial = () => {
        if (id) {
            return initialUpdateValues;
        }
        else
            return initialValues
    }

    const methods = useForm({
        defaultValues: initial(),
        resolver: yupResolver(UserformSchema),
    });
    const { handleSubmit } = methods;

    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const [updateUserGroups] = useMutation(UPDATE_USER_GROUPS);
    if (loading) console.log('Submitting...')
    if (error) console.log(`Submission error! ${error.message}`);

    const onSubmitForm = (inputs: any) => {
        console.log(user)
        if (id)
            handleUpdate();
        else
            handleCreate(inputs);
    }

    const handleCreate = (inputs: any) => {
        console.log("create");
        createUser(
            {
                variables: {
                    input: inputs,
                }
            }
        )
        updateUserGroups(
            {
                variables: {
                    id: data?.passwordSignup.id,
                    input: {
                        groups: userGroupsID,
                    }
                }
            }
        )
    }

    const handleUpdate = () => {
        updateUser(
            {
                variables: {
                    id: id,
                    input: {
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName
                    }
                }
            }
        )
        console.log(userGroupsID)
        updateUserGroups(
            {
                variables: {
                    id: id,
                    input: {
                        groups: userGroupsID,
                    }
                }
            }
        )
        navigate('/home');
    }

    return (
        <div id="page">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div id="fixed">
                        <div id="back-page">
                            <ArrowBackIcon id="arrowicon" />
                            Users
                        </div>
                        <div id="title">
                            <legend id="bold">{setTitle()}</legend>
                            <div id="add-cancel">
                                <div id="cancel" > Cancel </div>
                                <Button id="add" type="submit">
                                    {setButton()}
                                </Button>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div id="inputs">
                        <div id="form-row">
                            <FormInputText
                                name="firstName"
                                label="First name*"
                                type="text"
                                className="fields"
                            />
                            <FormInputText
                                name="middleName"
                                label="Middle name"
                                type="text"
                                className="fields"
                            />
                            <FormInputText
                                name="lastName"
                                label="Last Name*"
                                type="type"
                                className="fields"
                            />
                        </div>
                        <div id="form-row">
                            <FormInputText
                                name="email"
                                label="Email*"
                                type="text"
                                className="fields"
                            />
                            <FormInputText
                                name="phone"
                                label="Phone Number"
                                type="text"
                                className="fields"
                            />
                            <FormInputText
                                name="password"
                                label="Password*"
                                type="password"
                                className="fields"
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
            <ChecklistComponent
                name="Select Groups"
                mapList={groupList}
                atomName={userGroupsAtom}
                currentIDs={currentIDs}
            />
        </div >
    )
}

export default UserForm;

