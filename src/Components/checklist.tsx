
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_GROUPS, GET_USER_GROUPS } from '../Containers/Users/services/queries';
import { groupListAtom, userGroupsAtom } from '../states/groupStates';
import './checklist.css';

export const ChecklistComponent = () => {

    const { id } = useParams();
    const [groupList, setGroupList] = useRecoilState(groupListAtom);
    const [userGroupList, setUserGroup] = useRecoilState(userGroupsAtom);
    

    useQuery(GET_USER_GROUPS, {
        variables: { id },
        onCompleted: (data) => {
            data?.getUserGroups.map((item:any)=>setUserGroup([...userGroupList,item.id]));
        }
    });

    const currentIDs:string[] = [];
    userGroupList.map((item)=>currentIDs.push(item));
    
    
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
        if (event.target.checked && !(currentIDs.includes(group.id))) {
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