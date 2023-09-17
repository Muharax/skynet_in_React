import React from 'react';
import './GameAvatar.css';

export const GameAvatarVideo = ({ videoSrc, name, strength, defense, agility, intelligence }) => {
  return (
    <div className="avatar-card">
      <video className="avatar-media" loop autoPlay muted>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <CharacterDetails name={name} strength={strength} defense={defense} agility={agility} intelligence={intelligence} />
    </div>
  );
}

export const GameAvatarImage = ({ imgSrc, name, strength, defense, agility, intelligence }) => {
  return (
    <div className="avatar-card">
      <img className="avatar-media" src={imgSrc} alt={name} />
      <CharacterDetails name={name} strength={strength} defense={defense} agility={agility} intelligence={intelligence} />
    </div>
  );
}


const CharacterDetails = ({ name, strength, agility, intelligence }) => {
  return (
    <div className="avatar-details">
      <div className="avatar-label">{name}</div>
      <div className="avatar-stat">Siła: <span>{strength}</span></div>
      <div className="avatar-stat">Obrona: <span>{strength}</span></div>
      <div className="avatar-stat">Zręczność: <span>{agility}</span></div>
      <div className="avatar-stat">Inteligencja: <span>{intelligence}</span></div>
      
    </div>
  );
}
