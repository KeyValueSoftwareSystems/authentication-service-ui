
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_GROUPS, GET_USER_GROUPS } from '../Containers/Users/services/queries';
import { currentUserGroups, groupListAtom, userGroupsAtom } from '../states/groupStates';
import './checklist.css';

export const ChecklistComponent = () => {

    const { id } = useParams();
    const [groupList, setGroupList] = useRecoilState(groupListAtom);
    const [userGroupList, setUserGroup] = useRecoilState(userGroupsAtom);
    const [currentGroups, setCurrentGroups]= useRecoilState(currentUserGroups);

    useQuery(GET_USER_GROUPS, {
        variables: { id },
        onCompleted: (data) => {
            setCurrentGroups(data?.getUserGroups);
        }
    });
    const currentIDs:string[] = [];
    currentGroups.map((item)=>currentIDs.push(item.id));
    console.log(currentIDs);
    
    // currentIDs.map((x)=>console.log(x))

    // setUserGroup(currentIDs)
    // currentGroups.map((item)=>setUserGroup([...userGroupList,item.id]));
    // console.log(userGroupList)

    const removeGroup = (item: string) => {
        const itemIndex = userGroupList.findIndex((e) => e === item);
        setUserGroup([
            ...userGroupList.slice(0, itemIndex),
            ...userGroupList.slice(itemIndex + 1)
        ]);
    }

    useQuery(GET_GROUPS, {
        onCompleted: (data) => {
            setGroupList(data?.getGroups);
        }
    });

    const handleChange = (event: any, group: any) => {
        if (event.target.checked) {

            if (userGroupList[0] === "")
            {
                setUserGroup([group.id])
            }
            else {
                setUserGroup([...userGroupList, group.id]);
            }
        }
        else {
            removeGroup(group.id);
        }
        console.log(userGroupList)
    };

    const isChecked = (id: string) => {

        if (currentIDs.includes(id))
        {
            if (userGroupList[0] === "")
            {
                setUserGroup([id])
            }
            else
            {
                setUserGroup([...userGroupList,id])
            }
            return true;
        }
        else
        {
            return false;
        }
    }

    return (

        <div id="add-groups">
            <legend id="bold"> Select Groups </legend>
            {
                groupList.map((group: any) => {
                    return (
                        <div id="checkbox"> <label><input type="checkbox"  key={group.id} defaultChecked={isChecked(group.id)} onChange={(event: any) => handleChange(event, group)} />{group.name}</label><br></br></div>
                    )
                })
            }
        </div>
    )
}