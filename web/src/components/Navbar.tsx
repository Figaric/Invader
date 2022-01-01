import React from "react";
import Button from "./Button";
import Card from "./Card";

function Navbar() {
    return (
        <nav>
            <Card>
                <ul className="space-y-1">
                    <li>
                        <Button>
                            First btn
                        </Button>
                    </li>
                    <li>
                        <Button>
                            Second btn
                        </Button>
                    </li>
                    <li>
                        <Button>
                            Third btn
                        </Button>
                    </li>
                    <li>
                        <Button>
                            Fourth btn
                        </Button>
                    </li>
                </ul>
            </Card>
        </nav>
    );  
}

export default Navbar;