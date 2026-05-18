export async function apiFetch(apiUrl:string, data:any, method:string="POST"):Promise<Response>{
    // url should be like https://mitsprint.vercel.app
    const  SECRET_KEY = 'mitsprint123456789'
    const BASE_URL = "http://localhost:3000/"
    return fetch(BASE_URL+apiUrl, {
        method,
        headers:{
            SECRET_KEY:SECRET_KEY
        },
        body:JSON.stringify(data)
        
    })
}


