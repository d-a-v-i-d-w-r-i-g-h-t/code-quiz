# Code Quiz

## Description 

Your GitHub profile is an extremely important aspect of your public identity as a developer. A well-crafted one allows you to show off your work to other developers as well as potential employers. An important component of your GitHub profile—and one that many new developers often overlook—is the README.md file.

The quality of a README often differentiates a good project from a bad project. A good one takes advantage of the opportunity to explain and showcase what your application does, justify the technologies used, and even talk about some of the challenges you faced and features you hope to implement in the future. A good README helps you stand out among the large crowd of developers putting their work on GitHub.

There's no one right way to structure a good README. There is one very wrong way, however, and that is to not include a README at all or to create a very anemic one. This guide outlines a few best practices. As you progress in your career, you will develop your own ideas about what makes a good README.

At a minimum, your project README needs a title and a short description explaining the what, why, and how. What was your motivation? Why did you build this project? (Note: The answer is not "Because it was a homework assignment.") What problem does it solve? What did you learn? What makes your project stand out? 

Lastly, if your project is deployed, include a link to the deployed application here.

If you're new to Markdown, read the GitHub guide on [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).

If you need an example of a good README, check out [the VSCode repository](https://github.com/microsoft/vscode).


## Installation

N/A

## Usage 

When the page loads, the user is presented with a welcome message and a **Start Quiz** button. There is also a button in the top left to jump straight to the High Scores page if the user desires.

On clicking the **Start Quiz** button, the user is presented with a series of multiple choice questions, one at a time. Each question has four possible answers which the user can select between with either the mouse, the four responses themselves being buttons. The user can also input their answer with the keyboard, using number keys **1**, **2**, **3**, and **4**.

Upon selecting a correct answer, the answer is highlighted in green and a *Correct!* message is displayed under the question. If the selected answer is incorrect, the selected answer is highlighed in red, the correct answer is highlighted in green, and a *Wrong!* message is displayed under the question. The next question is then displayed.

50 questions are presented in a random order on the topics of HTML, CSS, and Javascript. Every question is asked once before the question list is re-randomized. The random question order and remaining question list is stored to Local Storage to be reloaded when the user returns to the page.

A countdown timer is displayed in the top right showing minutes and seconds remaining, and wrong answers are penalized with the subtraction of ten seconds. The button in the top left now says **Home** and will take the user back to the welcome page if desired.

At 30 seconds remaining, the timer turns red. At 15 seconds remaining, a glowing red border around the questions begins flashing. When all questions are answered or when time runs out, the quiz ends.

The user is then presented with their final score, equal to the number of seconds remaining when they finished answering all the questions. An input box with a **Submit** button is available for the user to enter their intials.

Upon submitting their initials, the user is then presented with the High Scores page where a list of up to ten high scores is displayed sorted from highest to lowest, including the score they just received. Scores are loaded from and saved to Local Storage and will persist between sessions. Under the list is a **Clear High Scores** button, which will empty the list and save the empty list to Local Storage. The **Home** button is again displayed in the top left.


To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

```md
![alt text](assets/images/screenshot.png)
```


## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.


I learned about CSS style transition effects from [W3schools](https://www.w3schools.com/), [CSS Transitions](https://www.w3schools.com/css/css3_transitions.asp).

I learned about using the ```forEach()``` method to modify the stile of all elements in a class from [Borislav Hadzhiev](https://bobbyhadz.com/), [Change a Style of all Elements with a specific Class in JS
](https://bobbyhadz.com/blog/javascript-change-style-of-all-elements-with-class).

The template for this README file was provided by [edX Boot Camps](https://www.edx.org/boot-camps).

The fantastic list of 50 questions, each with four multiple choice responses together with the correct answer, was provided already formatted in my designated object variable structure, by [ChatGPT-3.5](https://chat.openai.com/) from [OpenAI](https://openai.com/).


## License

Please refer to the LICENSE in the repo.
