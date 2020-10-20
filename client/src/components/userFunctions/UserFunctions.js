import axios from 'axios';

export const register = newUser => {
    return axios
    .post("lab/users/register", {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        address: newUser.address,
        postnumber: newUser.postnumber,
        city: newUser.city,
        country: newUser.country,
        phonenumber: newUser.phonenumber,
        birthday: newUser.birthday,
        email: newUser.email,
        role: newUser.role,
        password: newUser.password
    })
    .then(res => {
        console.log("Registered");
    })
}

export const sendEmail = newEmail => {
    return axios
        .post("/lab/emails/send-email", {
            from: newEmail.from,
            to: newEmail.to,
            subject: newEmail.subject,
            text: newEmail.text,
            html: newEmail.html
        })
        .then(res => {
            console.log("sent the email");
        })
}

export const login = user => {
    return axios
        .post('lab/users/login', {
            email: user.email,
            password: user.password,
        })
        .then(res => {
            localStorage.setItem("usertoken", res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const changeUserPrivileges = user => {
    return axios
    .post('lab/users/changeRole', {
        email: user.email,
        role: user.role
    })
    .then(res => {
        localStorage.setItem("usertoken", res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const add_items = newItem => {
    return axios
    .post("lab/items/item-create", {
        a_id: newItem.a_id,
        a_amount : newItem.a_amount,
        a_picturelink  : newItem.a_picturelink,
        a_description : newItem.a_description,
        a_productcode : newItem.a_productcode,
        a_category_id: newItem.a_category_id,
        a_shelf_place: newItem.a_shelf_place,
        a_shelf_amount: newItem.a_shelf_amount
    })
    .then(res => {
        console.log("item added");
    })
}

export const modify_an_item = modifiedItem => {
    return axios
    .post("lab/items/modifyAnItem", {
        a_id: modifiedItem.a_id,
        a_amount : modifiedItem.a_amount,
        a_picturelink  : modifiedItem.a_picturelink,
        a_description : modifiedItem.a_description,
        a_productcode : modifiedItem.a_productcode,
        a_category_id: modifiedItem.a_category_id,
        a_shelf_place: modifiedItem.a_shelf_place,
        a_shelf_amount: modifiedItem.a_shelf_amount
    })
    .then(res => {
        console.log("item modified");
    })
}
