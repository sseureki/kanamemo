
import React from 'react';
import Link from 'react-router/Link';

const Footer = ({ handleClick }) => (
	<div className="card-footer">
		<div className="row">
			<div className="col-5 col-sm-4 col-md-5 col-lg-4">
				<button className="btn btn-secondary btn-block" type="button" 
					onClick={handleClick}>
					Reset
				</button>
			</div>
			
			<div className="col-5 offset-2 col-sm-4 offset-sm-4 col-md-5 offset-md-2 col-lg-4 offset-lg-4">
				<Link to="/" className="btn btn-secondary btn-block" role="button">
					<i className="fa fa-check" aria-hidden="true" /> Ok
				</Link>
			</div>
		</div>
	</div>
);


export default Footer;