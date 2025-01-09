import React from 'react';

export default function About() {
    return (
        <div className="my-6">
            <h3 className="text-center text-2xl font-semibold">이준영</h3>
            <div className='text-center mt-5'>
                <p>부산대학교 산학협력단 KDT 개발자 양성과정 8회차</p>
                <p>https://github.com/eecsjlee</p>
            </div>

            <br />
            <br />
            <br />

            <h3 className="text-center text-2xl font-semibold">✨ Tech Stack ✨</h3>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
                <img src="https://img.shields.io/badge/springboot-6DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white" alt="SpringBoot" />
                <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
                <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" />
            </div>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
                <img src="https://img.shields.io/badge/figma-F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />
                <img src="https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
                <img src="https://img.shields.io/badge/mysql-6DB33F.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
            </div>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
                <img src="https://img.shields.io/badge/html5-E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
                <img src="https://img.shields.io/badge/css3-1572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
                <img src="https://img.shields.io/badge/javascript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=20232a" alt="JavaScript" />
            </div>

            <br />
            <br />
            <br />

            <h3 className="text-center text-2xl font-semibold">🛠 Tools 🛠</h3>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
                <img src="https://img.shields.io/badge/git-F05033.svg?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
                <img src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
                <img src="https://img.shields.io/badge/Notion-F3F3F3.svg?style=for-the-badge&logo=notion&logoColor=black" alt="Notion" />
            </div>

            <div className="flex justify-center flex-wrap gap-4 mt-4">
                <img src="https://img.shields.io/badge/visual_studio_code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Visual Studio Code" />
                <img src="https://img.shields.io/badge/intellij_idea-000000?style=for-the-badge&logo=intellijidea&logoColor=white" alt="IntelliJ IDEA" />
            </div>
        </div>
    );
}
