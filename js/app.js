/* =========================================================
   BRACED WEBSITE
   app.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("BRACED Website Loaded");

    /* ===========================
       SMOOTH SCROLL
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

    /* ===========================
       NAVBAR SHADOW
    =========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 50){

            header.style.boxShadow="0 10px 30px rgba(0,0,0,.12)";

        }

        else{

            header.style.boxShadow="0 2px 10px rgba(0,0,0,.05)";

        }

    });

    /* ===========================
       PREMIUM CALCULATOR
    =========================== */

    const calculatorForm=document.querySelector(".premium-calculator form");

    if(calculatorForm){

        calculatorForm.addEventListener("submit",(e)=>{

            e.preventDefault();

            const brand=calculatorForm.querySelectorAll("input")[0].value;

            const model=calculatorForm.querySelectorAll("input")[1].value;

            const price=parseFloat(calculatorForm.querySelectorAll("input")[2].value);

            if(brand==="" || model==="" || isNaN(price)){

                alert("Please fill all fields.");

                return;

            }

            const premium=(price*0.05).toFixed(2);

            alert(

                "Estimated Monthly Premium: ₹"+premium

            );

        });

    }

    /* ===========================
       CONTACT FORM
    =========================== */

    const contactForm=document.querySelector(".contact form");

    if(contactForm){

        contactForm.addEventListener("submit",(e)=>{

            e.preventDefault();

            const name=contactForm.querySelector('input[type="text"]').value;

            const email=contactForm.querySelector('input[type="email"]').value;

            const message=contactForm.querySelector("textarea").value;

            if(name==="" || email==="" || message===""){

                alert("Please complete all fields.");

                return;

            }

            alert("Thank you! Your message has been sent.");

            contactForm.reset();

        });

    }

});

/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector("h3");
    const answer = item.querySelector("p");

    if(answer){

        answer.style.display = "none";

        question.style.cursor = "pointer";

        question.addEventListener("click", () => {

            const isOpen = answer.style.display === "block";

            faqItems.forEach(faq => {

                const p = faq.querySelector("p");

                if(p){

                    p.style.display = "none";

                }

            });

            if(!isOpen){

                answer.style.display = "block";

            }

        });

    }

});

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".feature-card, .testimonial-card, .faq-item"
);

function revealOnScroll(){

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if(top < windowHeight - 100){

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }

    });

}

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all .6s ease";

});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* =========================================================
   BUTTON CLICK EFFECT
========================================================= */

document.querySelectorAll(".btn-primary, .btn-secondary").forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.96)";

        setTimeout(() => {

            button.style.transform = "scale(1)";

        },150);

    });

});

/* =========================================================
   HERO IMAGE FLOAT
========================================================= */

const heroImage = document.querySelector(".hero-image img");

if(heroImage){

    let up = true;

    setInterval(() => {

        heroImage.style.transform = up
            ? "translateY(-10px)"
            : "translateY(10px)";

        up = !up;

    },1500);

}
