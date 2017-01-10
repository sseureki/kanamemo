
import React, { PropTypes } from 'react';

const Progress = ({ className, value }) => {
	const style = value > 0 ? { width: `${value}%` } : null;
	const cs = `progress-bar${className ? ' ' + className : ''}`;
	
	return (
		<div className="progress kanamemo-progress">
			<div className={cs} role="progressbar" style={style}
				aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} />
		</div>
	);
};

Progress.propTypes = {
	value: PropTypes.number
};

export const HiraganaProgress = ({ enabled, value }) => (
	enabled && <Progress value={value} />
);

export const KatakanaProgress = ({ enabled, value }) => (
	enabled && <Progress value={value} className="bg-success" />
);