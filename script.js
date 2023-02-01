// div tags
let dispform = document.getElementById("img1")
let dispDets = document.getElementById("img2")
let dispDice = document.getElementById("img3")
let codegen = document.getElementById("img4")

let heading = document.getElementById("head3")
let regform = document.getElementById("form")

let randomizer = document.querySelector("#diceimg")

// Displaying Form on Click
dispform.addEventListener("click", displayForm)

function displayForm()
{
    heading.classList.remove("hide");
    regform.classList.remove("hide");
}

// Click Event for Submitting Form
const users = [];

function submitForm()
{
    let fullname = document.getElementById("name-input").value;
    let email = document.getElementById("email-input").value;
    let uname = document.getElementById("uname-input").value;

    let msg = document.getElementById("msg")
    msg.style.cssText = "margin: 10px"

    if(fullname && email && uname)
    {
        msg.style.color = "green";
        msg.innerHTML = "SUCCESS!"

        // pushing user to the array
        users.push(
            {
                name: fullname,
                mail: email,
                username: uname
            }
        )

        dispform.removeEventListener("click", displayForm)
        // console.log(users);
        regform.reset();
        dispDets.addEventListener("click", dispDetails)
    }
    else
    {
        msg.style.color = "red";
        msg.innerHTML = "ERROR! Please make sure all fields are filled before submitting."
    }
}

// Displaying User Details and Hiding the form



function dispDetails()
{
    heading.classList.add("hide");
    regform.classList.add("hide");

    // document.body.appendChild(userdetails)
    let userdetails = document.getElementById("details")

    users.forEach((user) =>
    {
        userdetails.innerHTML +=
        `
        <div> Name: ${user.name} </div>
        <div> Username: ${user.username} </div>
        `
    })  

    userdetails.classList.remove("hide")
    dispDets.removeEventListener("click", dispDetails)
    dispDice.addEventListener("click", diceDisplay)
}

// Displaying picture of dice
let divdice = document.getElementById("dice")

let diceOutcomes = [];
let tries = 2;
let diceClicks = 3;
let diceTotal = 0;

// displaying dice image
function diceDisplay()
{
    // heading.classList.add("hide");
    // regform.classList.add("hide");
    let userdetails = document.getElementById("details")
    userdetails.classList.add("hide");

    --tries;
    leftAttempts = document.getElementById("tries")
    leftAttempts.innerHTML = tries;
    divdice.classList.remove("hide")

    if(tries === 0 && diceTotal > 10)
    {
        dispDice.removeEventListener("click", diceDisplay)
    }

    randomizer.addEventListener("click", diceRandomizer)
}

function diceRandomizer()
{
    // console.log("hi")
    diceClicks--;
    let dclicks = document.getElementById("clicks")
    dclicks.innerHTML = diceClicks

    let diceOutcome = Math.floor(Math.random() * 6) + 1
    diceTotal += diceOutcome;

    let sum = document.getElementById("sum")
    sum.innerHTML = diceTotal;

    let textmsg = document.getElementById("textmsg")

    if(diceClicks === 0)
    {
        let diceimg = document.getElementById("diceimg")
        // diceimg.removeEventListener("click", diceRandomizer)   
        sum.innerHTML = diceTotal;

        if(diceTotal > 10)
        {
            textmsg.innerHTML = "Congrats! Your " + diceTotal+ " is greater than 10! Avail your coupon code!"
            randomizer.removeEventListener("click", diceRandomizer)
            codegen.addEventListener("click", generateCode)
        }
        else
        {
            if(tries != 0)
            {
                textmsg.innerHTML = "Your dice total " + diceTotal + " is less than 10! Try again!"
                diceClicks = 3;
                diceTotal = 0;
            }
            else
            {
                sum.innerHTML = diceTotal;
                textmsg.innerHTML = "Bad Luck! Your dice total " + diceTotal + " is not greater than 10. You have finished all attempts. Please start again!"
            } 
        }
    }
}

//  Generating 12-digit Coupon Code
function generateCode()
{
    divdice.classList.add("hide");

    let couponcode = document.createElement("div")
    document.body.appendChild(couponcode)
    
    let code = ""
    for(let i = 0; i < 12; i++)
    {
        code += Math.floor(Math.random() * 10)
    }

    couponcode.innerHTML = code;
    couponcode.innerHTML += '<br> <img src="https://cdn.dribbble.com/users/69311/screenshots/1226327/congrats-gif-edit.gif" alt="congrats" height="300px" width="400px">'

    if(couponcode != null)
    {
        codegen.removeEventListener("click", generateCode)
    }
}