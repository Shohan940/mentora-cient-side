export const coursesApi = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`);
    if(!res.ok){
        throw new Error('Faild to fetch')
    }
    return res.json();
}


export const getIdCoursesApi = async (id,token) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`|| " "
        }
    });
    if(!res.ok){
        throw new Error('Faild to fetch')
    }
    return res.json();
}

