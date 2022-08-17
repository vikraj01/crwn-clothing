import { useState } from "react"

import FormInput from "../form-input/form-input.component"

import Button from "../button/button.component"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

import './sign-up-form.styles.scss'

const deaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}




const SignUpForm = () => {
    const [formFields, setFormFields] = useState(deaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(deaultFormFields)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();


        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else {
                console.log('user creation encountered an error', error)
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have and account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName} required />
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />
                <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm