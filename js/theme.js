const themes = {
    dark: {
        bodyBackground: "url('./img/background.jpg')",
        titleBackground: "linear-gradient(to right, #eee 15%, #ee4b2b)" ,
        footerBackground: "#1A1918",
        textColor: "#EDEDEE",
        iconClass: "fa-moon",
        socialIconBackground: "#EDEDEE",
        socialIconColor: "#323131"
    },
    light: {
        bodyBackground: "url('./img/background_light.jpeg')",
        titleBackground: "linear-gradient(to right, #2C2B2B 15%, #ee4b2b)" ,
        footerBackground: "#EDEDEE",
        textColor: "#1A1918",
        iconClass: "fa-sun",
        socialIconBackground: "#757272",
        socialIconColor: "#EDEDEE"
    }
};

let currentTheme = themes.dark;

const theme_btn = document.getElementById("js-theme-button");
const title = document.getElementById("title");
const footer = document.querySelector("footer");
const copyright = document.querySelector(".footer-copyright");
const icon = document.querySelector(".icon");

let themeState = 1; //1 --> Dark Mode    0--> Light mode


theme_btn.addEventListener("click",  ()=> 
{
    
    themeState ? 
    (currentTheme = themes.light, icon.classList.remove("fa-moon"), icon.classList.add("fa-sun"), themeState = 0) : 
    (currentTheme = themes.dark, icon.classList.remove("fa-sun"), icon.classList.add("fa-moon"), themeState = 1);

    changeThemeValues();
});

function changeThemeValues()
{
    document.body.style.backgroundImage = currentTheme.bodyBackground;
    footer.style.backgroundColor = currentTheme.footerBackground;
    copyright.style.color = currentTheme.textColor;
    title.style.backgroundImage = currentTheme.titleBackground;
    changeSocialIconTheme();
}

function changeSocialIconTheme() {
    const socialIcons = document.querySelectorAll(".social-icons a");
    socialIcons.forEach(icon => {
        icon.style.backgroundColor = currentTheme.socialIconBackground;
        icon.style.color = currentTheme.socialIconColor;
    });
}