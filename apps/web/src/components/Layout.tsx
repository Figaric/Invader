import Head from "next/head";
import React from "react";
import Card from "./Card";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
    return (
        <main className="
            min-h-screen
            bg-dark
        ">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Invader - Homepage</title>
            </Head>

            {/* Wrapper */}
            <div className="
                flex
                w-full
                justify-center
                pt-5
            ">
                <div className="
                    sm:block
                    md:grid
                    grid-cols-3
                ">
                    {/* Navbar */}
                    <div className="
                        flex
                        justify-end
                        pr-6
                    ">
                    </div>
                    {/* Page content */}
                    <div className="
                        flex
                        justify-center
                    ">
                        {children}
                    </div>
                    {/* Third column */}
                    <div className="
                        pl-6
                    ">
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Layout;