# Blink Tac Toe

[Live Demo] https://blink-tac-toe-232323.netlify.app/ 


## Overview

**Blink Tac Toe** is a fun, twisted take on the classic Tic Tac Toe game built with **React.js**, **Vite**, **Three.js**, and **shadcn UI** for styling. Instead of Xs and Os, players use emojis from custom categories, and a unique "vanishing emoji" rule keeps the gameplay dynamic and challenging.

## Tech Stack

- **React.js** (Functional Components, Hooks)  
- **Vite** (For fast development and build)  
- **Three.js** (3D animations for emoji placement and disappearance)  
- **shadcn UI** (For clean, responsive styling and UI components)  
- **CSS** (Responsive layout with mobile-first design)


## Game Rules & Features

- 3x3 grid, max 6 active emojis on the board at once (3 per player).  
- Players alternate turns; each turn places a random emoji from their chosen category.  
- Vanishing Rule: If a player tries to place their 4th emoji, the oldest emoji disappears (FIFO), and the 4th emoji cannot be placed on that cell.  
- Win by forming a line of 3 emojis from the same player (horizontal, vertical, diagonal).  
- After a win, a message displays the winner and offers a "Play Again" button to restart.  
- Responsive design for both desktop and mobile screens.  
- Clear UI indicating which player's turn it is.  
- Help section explaining game rules for first-time players.  

## Bonus Features implemented
The "vanishing" feature was implemented using a FIFO queue for each player’s emoji placements:

- Each player’s placed emojis are tracked in a queue (array).  
- When placing the 4th emoji, the emoji at the front of the queue (oldest) is removed from the board.  
- The new emoji is placed in a different cell, disallowing placement on the removed emoji’s cell immediately.  
- Animations using **Three.js** add smooth fade-out effects for vanished emojis, improving user experience.



- Implemented a **score tracker** to keep track of wins across multiple rounds.  
- Added **sound effects** for emoji placement, disappearance, and winning.  
- Animated the winning line highlight with colorful effects.  
- Enhance accessibility features (keyboard navigation, screen reader support).  
- Added an option to customize emoji categories or create custom sets.  
- Improved AI opponent for single-player mode.  
- Better mobile touch responsiveness and swipe gestures.  



---

Dhanvin Vadlamudi
