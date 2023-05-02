import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./loader.css";
function Loader(props) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      navigate(props.to);
    }, props.delay || 3000);

    return (
		
	) => {
      clearTimeout(timeoutId);
    };
  }, [navigate, props.delay, props.to]);
  return (
	<div className="preload">
		<div class="boxes">
			<div class="box">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="box">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="box">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="box">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
);

}

export default Loader;
