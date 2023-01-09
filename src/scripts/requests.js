export const baseURL = "http://localhost:6278"

export const { token } = getUser()

export const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
}

export const red = ""
export const green = ""


export function getUser() {
    const user = JSON.parse(localStorage.getItem("@KenzieEmpresas:user")) || {}

    return user
}

export async function getUserInfo() {
    const user = await fetch(`${baseURL}/users/profile`, {
        method: "GET",
        headers: headers
    })

    const userJSON = await user.json()

    return userJSON
}

export async function checkAdmin() {
    const admin = await fetch(`${baseURL}/auth/validate_user`, {
        method: "GET",
        headers: headers
    })

    const adminJSON = await admin.json()

    return adminJSON
}

export async function register(data) {
    const register = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })

    console.log(data)
    console.log(register)

    const registerJSON = await register.json()

    if(!register.ok) {
        // CHAMAR TOASTIFY AQUI
        console.log(registerJSON.error[0])
    } else {
        window.location.replace("/src/pages/login.html")
    }

    return registerJSON
}

export async function getCompanies() {
    const companies =  await fetch(`${baseURL}/companies`)

    const companiesJSON = await companies.json()

    return companiesJSON
}

export async function getCompaniesBySector(sector) {
    const companies = await fetch(`${baseURL}/companies/${sector}`)

    const companiesJSON = await companies.json()

    return companiesJSON
}

export async function userCompanyDepartments(){
    const companyDepartments = await fetch(`${baseURL}/users/departments`, {
        method: "GET",
        headers: headers
    })

    const companyDepartmentsJSON = await companyDepartments.json()

    return companyDepartmentsJSON // retorna a compania + departamentos
}

export async function userCoworkers() {
    const coworkers = await fetch(`${baseURL}/users/departments/coworkers`, {
        method: "GET",
        headers: headers
    })

    // console.log(coworkers)

    const coworkersJSON = await coworkers.json()

    const coworkersList = await coworkersJSON[0].users

    // console.log(coworkersJSON[0].users)

    return coworkersList
}

export async function login(data) {
    const login = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })

    const loginJSON = await login.json()

    console.log(loginJSON)


    if(!login.ok) {
        // CHAMAR TOASTIFY AQUI
        console.log(loginJSON.error)
    }
    else {
        setUser(loginJSON) // por enquanto passamos só o token pro localStorage
        window.location.reload()

        // const user = await checkAdmin()
        // console.log(token)

        // console.log(user)

        // if(user.is_admin) {
        //     window.location.replace("/src/pages/dashboardAdmin.html")
        // } else {
        //     // window.location.replace("/src/pages/dashboard.html")
        // }
    }

    return loginJSON
}

export function setUser(token) {
    const user = localStorage.setItem("@KenzieEmpresas:user", JSON.stringify(token))
}

export async function getSectors() {
    const sectors = await fetch(`${baseURL}/sectors`)

    const sectorsJSON = await sectors.json()

    return sectorsJSON
}

export async function isLogged(){
    const user = await getUser() // || {}  precisa do ou aqui?
    
    if(user.token) {
        const userIsAdmin = await checkAdmin()  // || {} precisa do ou aqui?

        if(userIsAdmin.is_admin) {
            // console.log("é adm")
            return "admin"
            // window.location.replace("/src/pages/dashboardAdmin.html")
        } else if (userIsAdmin.is_admin == false){
            // console.log("n é adm")
            return "usuario"
            // window.location.replace("/src/pages/dashboard.html")
        }
    }
    else {
        return false
    }
}

export async function updateProfile(data) {
    const user = await fetch(`${baseURL}/users`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(data)
    })

    const userJSON = await user.json()

    return userJSON
}

// ADMIN ONLY
export async function getAllDepartments() {
    const departments = await fetch(`${baseURL}/departments`, {
        method: "GET",
        headers: headers
    })

    const departmentsJSON = await departments.json()

    return departmentsJSON
}

export async function getAllDepartmentsFromCompany(uuid) {
    const departments = await fetch(`${baseURL}/departments/${uuid}`, {
        method: "GET",
        headers: headers
    })

    const departmentsJSON = await departments.json()

    return departmentsJSON
}

export async function getAllUsers() {
    const users = await fetch(`${baseURL}/users`, {
        method: "GET",
        headers: headers
    })

    const usersJSON = users.json()

    return usersJSON
}

export async function createDepartment(data) {
    const department = await fetch(`${baseURL}/departments`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })

    const departmentJSON = await department

    return departmentJSON
}

export async function getUsersWithoutJob(){
    const users = await fetch(`${baseURL}/admin/out_of_work`, {
        method:"GET",
        headers: headers
    })

    const usersJSON = await users.json()

    return usersJSON
}

export async function hireUser(data) {
    const user = await fetch(`${baseURL}/departments/hire/`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(data)
    })

    const userJSON = await user.json()

    return userJSON
}

export async function fireUser(uuid) {
    const user = await fetch(`${baseURL}/departments/dismiss/${uuid}`, {
        method:"PATCH",
        headers: headers
    })
}
