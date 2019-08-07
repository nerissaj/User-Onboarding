import React,{useState, useEffect} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import {Form, Field, withFormik} from 'formik';

const UserForm = ({errors, touched, values, handleSubmit, status}) => {
    const [users, setUsers] = useState([]);
    console.log(users);
    useEffect(()=>{
        if(status){
            setUsers([...users, status]);
        }
    },[status]);
    return(
        <div className="user-form">
            <h1>User Form</h1>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
                <Field type="text" name="email" placeholder="email" />
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                <Field type="text" name="password" placeholder="password" />
                {touched.password && errors.password && <p className="error">{errors.password}</p>}
                <label className="checkbox-container">Terms of Service<Field type="checkbox" name="Terms of Service" checked={values.TermsofService}/>
                <span className="checkmark" />
                </label>
                <button type="submit">Submit!</button>
            </Form>
            {users.map(user =>(
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, TermofService}){
        return {
            TermofService: TermofService || false,
            name: name || '',
            email: email || '',
            password: password || ''
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('This is REQUIRED!'),
        email: Yup.string().required('Duh, email please'),
        password:Yup.string()
    }),
    handleSubmit(values,{setStatus}){
        axios
         .post('https://reqres.in/api/users', values)
        .then(res =>{
            setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
})(UserForm);
export default FormikUserForm;