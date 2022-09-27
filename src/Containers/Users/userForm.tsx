
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './styles/styles.css';
import { useNavigate, useParams } from "react-router-dom";
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { ChecklistComponent } from '../../Components/checklist';
import { useMutation, useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../states/userStates';
import { CREATE_USER, UPDATE_USER, UPDATE_USER_GROUPS } from './services/mutations';
import { GET_USER, GET_USER_GROUPS } from './services/queries';
import {  userGroupsAtom } from '../../states/groupStates';


const UserForm: React.FC = () => {

    const navigate = useNavigate();

    let { id } = useParams();

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

    const [user,setUser] = useRecoilState(userAtom);
    const [userGroupsID,setUserGroups] = useRecoilState(userGroupsAtom);
  
    const onChange = (key: string, value: string) => {
        setUser(
            {
                ...user,
                [key]: value
            }
        )
    }
    console.log(user);

    const [createUser,{data,loading,error}] = useMutation(CREATE_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const [updateUserGroups]= useMutation(UPDATE_USER_GROUPS);
    if (loading) console.log('Submitting...') 
    if (error) console.log(`Submission error! ${error.message}`);

    useQuery(GET_USER, {
        variables: { id },
        onCompleted: (data) => {
            setUser(data?.getUser);
        }
    }
    );

    const handleSubmit = () => {
        if (id)
            handleUpdate();
        else
            handleCreate();
    }

    const handleCreate = () => {
        console.log("create");
        createUser(
            {
                variables: {
                    input: {
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName,
                        phone: user.phone,
                        email: user.email,
                        password: user.password
                    }
                }
            }
        )
        updateUserGroups(
            {
                variables: {
                    id:data?.passwordSignup.id,
                    input: {
                        groups:userGroupsID,
                    }
                }
            }
        )        
    }

    const handleUpdate = () => {

        updateUser(
            {
                variables: {
                    id:id,
                    input: {
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName
                    }
                }
            }
        )

        updateUserGroups(
            {
                variables: {
                    id:id,
                    input: {
                        groups:userGroupsID,
                    }
                }
            }
        )        
        navigate('/home');
    }

    return (
        <div id="page">
            <div id="fixed">
                <div id="back-page">
                    <ArrowBackIcon id="arrowicon" />
                    Users
                </div>
                <div id="title">
                    <legend id="bold">{setTitle()}</legend>
                    <div id="add-cancel">
                        <div id="cancel" > Cancel </div>
                        <Button id="add" onClick={handleSubmit}>{setButton()}</Button>
                    </div>
                </div>
                <hr />
            </div>
            <Form>
                <div id="inputs">
                    <div id="form-row">
                        <Input id="fields" onChange={(event) => { onChange("firstName", event.target.value) }} value={user.firstName} placeholder="First Name*" />
                        <Input id="fields" onChange={(event) => { onChange("middleName", event.target.value) }} value={user.middleName} placeholder="Middle Name" />
                        <Input id="fields" onChange={(event) => { onChange("lastName", event.target.value) }} value={user.lastName} placeholder="Last Name*" />
                    </div>
                    <div id="form-row">
                        <Input id="fields" onChange={(event) => { onChange("phone", event.target.value) }} value={user.phone} placeholder="Mobile Number" />
                        <Input id="fields" onChange={(event) => { onChange("email", event.target.value) }} value={user.email} placeholder="Email*" />
                        <Input id="fields" onChange={(event) => { onChange("password", event.target.value) }} value={user.password} placeholder="Password*" />
                    </div>
                </div>
            </Form>
            <ChecklistComponent />
        </div>
    )
}

export default UserForm;

