import React from "react";
import Card from "../../components/Card";
import RegisterForm from "../../components/RegisterForm";

function Register() {
    return (
        <div>
            <p className="mb-5"><h1>Sign up to <span className="text-orange-primary">Invader</span></h1></p>
            <Card>
                <RegisterForm />
            </Card>
        </div>
    );
}

export default Register;