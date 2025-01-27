'use client';
import ButtonGalt from "@/components/button";
import Header from "@/components/header";
import InputGalt from "@/components/input";
import { useState } from "react";

export default function Home() {
    return (
        <main className="w-full h-full">
            <Header />
            <div className="flex w-full h-[80vh]">
                <div className="flex items-center justify-center w-[50%]">
                    <img src="/assets/homeImage.jpg" alt="undraw_education" className="w-full md:w-[80%]" />
                </div>
                <div className="flex w-[50%] items-center justify-center h-[64vh] text-justify mr-[20px]">
                        <h1 className="text-black font-wight-bold text-xl">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores sunt voluptas quos natus soluta quis accusamus dicta labore quisquam aspernatur, vel, minus velit neque saepe voluptatum laborum libero. Odit, culpa!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda praesentium tempore consectetur architecto nulla, quos consequuntur soluta illum corrupti quaerat distinctio, adipisci consequatur reprehenderit repudiandae temporibus eveniet facilis quidem aut.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dicta laudantium nemo, temporibus laboriosam ducimus modi error placeat quaerat, quae natus, iusto sit libero corporis obcaecati omnis alias repellendus dignissimos?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quasi maxime exercitationem velit, quaerat aperiam nisi recusandae explicabo facere alias molestias tempora et cupiditate autem praesentium soluta similique laborum nemo!
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime repellat quaerat eius officia laboriosam ratione excepturi voluptates, debitis quod sequi maiores laudantium quasi? Porro necessitatibus quam excepturi quibusdam iure?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, esse. Magnam, nulla reprehenderit. Ab nam consequatur rem molestias, animi tempore nihil adipisci, dolorum quod id impedit voluptatem, velit architecto suscipit?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis deleniti nostrum qui omnis, corporis explicabo, rem soluta quibusdam incidunt quia veritatis quisquam? Harum omnis optio fugit nihil quo recusandae eaque?
                        </h1>
                </div>
            </div>
        </main>
    );
}
