import { motion } from "framer-motion";
import Button from "../components/Button";
import Card from "../components/Card";
import RegisterForm from "../components/RegisterForm";

function Index() {
    return (
        <div>
            <Card
                withAnimation>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat temporibus officiis aperiam consequatur modi, sed hic neque qui ea a.
                </p>
            </Card>
            {/* <Card>
                <RegisterForm />
            </Card> */}
        </div>
    );
}

export default Index;