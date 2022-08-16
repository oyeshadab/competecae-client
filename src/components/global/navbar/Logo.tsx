import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div>
      <Link to="/">
        <img className="w-[111px]" src="/images/cae 2.png" alt="" />
      </Link>
    </div>
  );
}
