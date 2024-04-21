import React, {  useState } from 'react';
import { Link } from 'react-router-dom';

function AdminSideFrame() {
    
    const [isEvent, setIsEvent] = useState(false);
    const [graduation, setGraduation] = useState([
        { grad: 'Under-graduation', checked: false }
    ]);
    const [branches, setBranches] = useState([
        { branch: 'Computer Science and Engineering', checked: false }
    ]);
    const [years, setYears] = useState([
        { year: '1st', checked: false },
        { year: '2nd', checked: false },
        { year: '3rd', checked: false },
        { year: '4th', checked: false }
    ]);

    const [classes, setClasses] = useState([[
        { class: 'A', checked: false },
        { class: 'B', checked: false },
        { class: 'C', checked: false }
    ],[
        { class: 'A', checked: false },
        { class: 'B', checked: false },
        { class: 'C', checked: false }
    ],[
        { class: 'A', checked: false },
        { class: 'B', checked: false },
        { class: 'C', checked: false }
    ],[
        { class: 'A', checked: false },
        { class: 'B', checked: false },
        { class: 'C', checked: false }
    ]]);

    // useEffect(() => {
    //     // Retrieve values from localStorage
    //     const localStorageData = JSON.parse(localStorage.getItem('recievers'));
    //     if (localStorageData) {
    //         setIsEvent(localStorageData[0]);
    //         setGraduation(localStorageData.slice(1).map(gradObj => ({ grad: gradObj.grad, checked: false })));
    //         setBranches(localStorageData.slice(1).flatMap(gradObj => gradObj.branches.map(branchObj => ({ branch: branchObj.branch, checked: false }))));
    //         setYears(localStorageData.slice(1).flatMap(gradObj => gradObj.branches.flatMap(branchObj => branchObj.years.map(yearObj => ({ year: yearObj.year, checked: false })))));
    //         setClasses(localStorageData.slice(1).flatMap(gradObj => gradObj.branches.flatMap(branchObj => branchObj.years.flatMap(yearObj => yearObj.classes.map(cls => ({ class: cls, checked: false }))))));
    //     }
    // }, []);

    // handle changes
    const handleGraduationChange = (index) => {
        const temp = [...graduation];
        temp[index].checked = !temp[index].checked;
        setGraduation(temp);
    };

    const handleBranchChange = (index) => {
        const temp = [...branches];
        temp[index].checked = !temp[index].checked;
        setBranches(temp);
    };

    const handleYearChange = (index) => {
        const temp = [...years];
        temp[index].checked = !temp[index].checked;
        setYears(temp);
    };

    const handleClassChange = (index,index1) => {
        const temp = [...classes];
        temp[index][index1].checked = !temp[index][index1].checked;
        setClasses(temp);
    };

    const generateJsonTree = () => {
        // Generate JSON tree and store in localStorage
        let c = 0;
        const checkedItems = [isEvent];
        graduation.forEach((grad) => {
            if (grad.checked) {
                const gradObj = { grad: grad.grad, branches: [] };
                // Check branches
                branches.forEach((branch) => {
                    if (branch.checked) {
                        const branchObj = { branch: branch.branch, years: [] };
                        // Check years
                        years.forEach((year) => {
                            if (year.checked) {
                                const yearObj = { year: year.year, classes: [] };
                                // Check classes
                                classes[c].forEach((cls) => {   
                                    if (cls.checked) {
                                        yearObj.classes.push(cls.class);
                                    }
                                });
                                c+=1;   
                                branchObj.years.push(yearObj);
                            }
                        });
                        gradObj.branches.push(branchObj);
                    }
                });
                checkedItems.push(gradObj);
            }
        });
        localStorage.setItem('recievers', JSON.stringify(checkedItems));
        console.log(JSON.stringify(checkedItems, null, 4));
    };
    return (
        <div className='blue h-full flex flex-col justify-center  items-center gap-4 '>
            <Link to='/studentData' className='hover:cursor-pointer purple text-center font-bold mb-10 p-2 px-4 rounded-md'>View Student information</Link>
            <div className='text-2xl'>Please Select the Recievers</div>
            <div className=' w-3/4 h-3/4 overflow-scroll gap-4'>
                {graduation.map((grad,index)=>{
                    return(
                        <div key={index} className=''>
                            <div className='gap-4 py-2 flex px-4'>
                                <input checked={grad.checked} onChange={()=>handleGraduationChange(index)} type='checkbox' id={grad.grad} />
                                <label htmlFor={grad.grad}>{grad.grad}</label>
                            </div>
                            {graduation[index].checked && branches.map((branch,index)=>{
                                return(
                                    <div key={index} className='border-l border-blue-500 px-4 py-2'>
                                        <div className='gap-4 py-2 flex px-2'>
                                            <input checked={branch.checked} onChange={()=>handleBranchChange(index)} type='checkbox' id={branch.branch} />
                                            <label htmlFor={branch.branch}>{branch.branch}</label>
                                        </div>
                                        {branches[index].checked && years.map((year,index)=>{
                                            return(
                                                <div key={index} className='border-l border-green-500 px-4 py-2'>
                                                    <div className='gap-4 py-2 flex px-2'>
                                                        <input checked={year.checked} onChange={()=>handleYearChange(index)} type='checkbox' id={year.year} />
                                                        <label htmlFor={year.year}>{year.year} Year</label>
                                                    </div>
                                                    {years[index].checked && classes[index].map((cls,index1)=>{
                                                        return(
                                                            <div key={index1} className='border-l border-green-500 px-4 py-2'>
                                                                <div className='gap-4 py-2 flex px-2'>
                                                                    <input checked={cls.checked} onChange={()=>handleClassChange(index,index1)} type='checkbox' id={cls.class} />
                                                                    <label htmlFor={cls.class}>{cls.class} Section</label>
                                                                </div>
                                                                
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                <div className='gap-4 py-2 flex px-2'>
                    <input checked={isEvent} onChange={()=>setIsEvent(!isEvent)} type='checkbox' id='event' />
                    <label htmlFor='event'> Event</label>
                </div>
                <div onClick={generateJsonTree} className='hover:cursor-pointer purple text-center font-bold mb-10 p-2 rounded-md'>Set Recievers</div>
            </div>
        </div>
    )
    }

export default AdminSideFrame