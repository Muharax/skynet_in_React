import React, {useState} from 'react';
import './ix.css';
import { GameAvatarVideo, GameAvatarImage } from './GameAvatar';
import postac2Animation from './img/postac2Animation.mp4';

import postac1 from './img/postac1.jpg';
import postac2 from './img/postac2.jpg';
import postac3 from './img/postac3.jpg';
import postac4 from './img/postac4.jpg';
import postac5 from './img/postac5.jpg';
import postac6 from './img/postac6.jpg';

const charactersData = [
    { 
        imgSrc: postac1,
        videoSrc: postac2Animation, 
        name: "Złodziej dusz",
        strength: 8,
        defense: 4,
        agility: 9,
        intelligence: 6 
    },
    { 
        imgSrc: postac2,
        videoSrc: postac2Animation, 
        name: "Młotogłowy",
        strength: 12,
        defense: 6,
        agility: 3,
        intelligence: 2 
    },
    { 
        imgSrc: postac3,
        videoSrc: postac2Animation, 
        name: "X parian",
        strength: 2,
        defense: 8,
        agility: 4,
        intelligence: 7 
    },
    { 
        imgSrc: postac4,
        videoSrc: postac2Animation, 
        name: "Oskrzydlona",
        strength: 2,
        defense: 8,
        agility: 4,
        intelligence: 7 
    },
    { 
        imgSrc: postac5,
        videoSrc: postac2Animation, 
        name: "Leśna Milo",
        strength: 2,
        defense: 8,
        agility: 4,
        intelligence: 7 
    },
    { 
        imgSrc: postac6,
        videoSrc: postac2Animation, 
        name: "Krwawa Śmierć",
        strength: 2,
        defense: 8,
        agility: 4,
        intelligence: 7 
     }
  ];

  const Ix = () => {
    const [scale, setScale] = useState(1);  // Stan dla skali
    
    return (
      <div className='non-selectable-component'>
        {/* Suwak do regulacji skali */}
        <div>
          <label>
            Regulacja skali: 
            <input 
              type="range" 
              min="0.50" 
              max="1.35" 
              step="0.01" 
              value={scale} 
              onChange={e => setScale(e.target.value)} 
            />
          </label>
        </div>
  
        <div className='wybor-postaci'>
          {charactersData.map(character => (
            <div key={character.name}>
              <GameAvatarVideo 
                videoSrc={character.videoSrc}
                name={character.name} 
                strength={character.strength}
                defense={character.defense}
                agility={character.agility}
                intelligence={character.intelligence}
                scale={scale}  // przekazanie skali
              />
              <GameAvatarImage 
                imgSrc={character.imgSrc} 
                name={character.name} 
                strength={character.strength}
                defense={character.defense}
                agility={character.agility}
                intelligence={character.intelligence}
                scale={scale}  // przekazanie skali
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  
  
  

export default Ix;
