import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function ScrollTop() {

    const {path} = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    },[path]);
  return null;
}
