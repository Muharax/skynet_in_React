import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const checkRole = (path) => {
  const role = localStorage.getItem('role');

  if (path === '/Uzytkownicy' && role !== 'admin') {
    return 'Brak dostępu';
  }

  return null;
};

export const Block = ({ message }) => {
  return message ? <div>{message}</div> : null;
};

export const PrivateRoute = ({ path, setAlertMessage, ...props }) => {
  const location = useLocation();
  const message = location.pathname === path ? checkRole(path) : null;

  useEffect(() => {
    setAlertMessage(message);
  }, [message, setAlertMessage]);

  return message ? <Block message={message} /> : <Routes><Route path={path} {...props} /></Routes>;
};
