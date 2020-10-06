import React from 'react'
import {Label, Tag, Text } from 'react-konva';

function LabelText ({ x, y, text }) {
  return (
 <Label
				offsetY={ 10 }
				x={ x }
        y={ y }
				style={{zIndex: 20}}
			>
				<Tag
					name={ 'name' }
					fill='#000'
					opacity={ 0.4 }
					pointerDirection='down'
					pointerWidth={ 10 }
					pointerHeight={ 10 }
					lineJoin='round'
					cornerRadius={ 7 }
				/>
				<Text
					name={ 'name' }
					padding={ 5 }
					fontFamily='Calibri'
					text={text}
					fontSize={ 16 }
					lineHeight={ 1.2 }
					fill='#fff'
				/> 
    </Label>
  )
}

export default LabelText;