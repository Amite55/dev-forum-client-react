import React from 'react';
import TagBox from './TagBox';
import {tags} from './TagData';

const Tags = () => {
    return (
        <div className='pt-4 flex items-center justify-between overflow-x-auto'>
            {tags?.map(item => (
                <TagBox key={item.label} label={item.label} icon={item.icon} />
            ))}
        </div>
    );
};

export default Tags;