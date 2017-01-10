
import React from 'react';

const StatusBar = ({ hiragana, katakana }) => (
	<div className="card-block py-3">
		<div className="row no-gutters justify-content-center text-center text-muted kanamemo-status">
			<div className="col">
				Hiragana {hiragana.enabled ? `lvl ${hiragana.level}` : 'disabled'}
			</div>
			
			<div className="col">
				Katakana {katakana.enabled ? `lvl ${katakana.level}` : 'disabled'}
			</div>
		</div>
	</div>
);

export  default StatusBar;