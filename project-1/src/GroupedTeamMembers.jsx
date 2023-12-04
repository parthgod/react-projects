import {useState} from 'react';

const GroupedTeamMembers = ({employees,selectedTeam,setTeam}) => {

    const[groupedEmployees,setGroupedData]=useState(groupTeamMembers);

    function groupTeamMembers()
    {
        var team=[];
        var teamAMembers=employees.filter((employee) => employee.teamName==='TeamA');
        var teamA={team:'TeamA',members:teamAMembers,collapsed:selectedTeam==='TeamA'?false:true};
        team.push(teamA);

        var teamBMembers=employees.filter((employee) => employee.teamName==='TeamB');
        var teamB={team:'TeamB',members:teamBMembers,collapsed:selectedTeam==='TeamB'?false:true};
        team.push(teamB);

        var teamCMembers=employees.filter((employee) => employee.teamName==='TeamC');
        var teamC={team:'TeamC',members:teamCMembers,collapsed:selectedTeam==='TeamC'?false:true};
        team.push(teamC);

        var teamDMembers=employees.filter((employee) => employee.teamName==='TeamD');
        var teamD={team:'TeamD',members:teamDMembers,collapsed:selectedTeam==='TeamD'?false:true};
        team.push(teamD);

        return team;
    }

    function handleTeamClick(event)
    {
        // console.log(event.currentTarget);
        var newGroupData=groupedEmployees.map((groupedData)=>groupedData.team===event.currentTarget.id?{...groupedData,collapsed:!groupedData.collapsed}:groupedData);
        setGroupedData(newGroupData);
        setTeam(event.currentTarget.id);
    }

    return (
        <main className="container">
            {
                groupedEmployees.map((item)=>{
                    return(
                        <div key={item.team} className='card mt-2' style={{cursor:'pointer'}}>
                            <h4 id={item.team} className='card-header text-secondary bg-white' onClick={handleTeamClick}>
                                Team Name : {item.team}
                            </h4>
                            <div id={"collapse_"+item.team} className={item.collapsed===true?"collapse":""}>
                                <hr/>
                                {
                                    item.members.map(member=>{
                                        return(
                                            <div className='mt-2'>
                                                <h5 className='card-title mt-2'>
                                                    <span className='text-dark'>Full name: {member.fullName}</span>
                                                </h5>
                                                <p>Designation: {member.designation}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </main>
    )
}

export default GroupedTeamMembers;