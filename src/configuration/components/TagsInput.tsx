import React, { useEffect, useState } from 'react';
import Save from './Save';
import axios from 'axios';

function TagsInput() {
    const initialTags = localStorage.getItem('blacklisted');
    const defaultBlacklistedItems = ['Games', 'Social Media']; // Default blacklisted items
    const [tags, setTags] = useState<string[]>(initialTags ? JSON.parse(initialTags) : defaultBlacklistedItems);

    useEffect(() => {
        // Save default blacklisted items to local storage on first install
        if (!initialTags) {
            localStorage.setItem('blacklisted', JSON.stringify(defaultBlacklistedItems));
        }
    }, []);

    function sendBlocked() {
        try {
            axios.post('http://localhost:2244/blocked', {
                blocked: JSON.parse(localStorage.getItem('blacklisted') || "[]")
            }).then((res) => {
                // Handle response if needed
            });
        } catch (e) {
            console.error(e);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter') return;
        const value = e.currentTarget.value.trim();
        if (!value) return;
        setTags([...tags, value]);
        e.currentTarget.value = '';
        const saveTextElement = document.getElementById('saveText');
        if (saveTextElement) {
            saveTextElement.innerHTML = 'Save';
        }
    }

    function saveTags() {
        localStorage.setItem('blacklisted', JSON.stringify(tags));
        const saveTextElement = document.getElementById('saveText');
        if (saveTextElement) {
            saveTextElement.innerHTML = 'Saved ✔';
        }
        sendBlocked();
    }

    function removeTag(index: number) {
        setTags(tags.filter((_, i) => i !== index));
        const saveTextElement = document.getElementById('saveText');
        if (saveTextElement) {
            saveTextElement.innerHTML = 'Save';
        }
    }

    return (
        <div className='flex-col justify-center items-center'>
            <input
                onKeyDown={handleKeyDown}
                type="text"
                className="rounded-full border-solid border-[1px] border-red-500 focus:shadow-lg mt-5 p-3"
                placeholder="Add topics to block"
            />
            <h6 className='m-0 font-medium pt-2'>Press enter to add topics</h6>
            <div className='flex justify-center items-center p-8'>
                <div className="flex justify-center items-center overflow-x-auto overflow-auto w-2/3 h-20 border w-30 pt-5">
                    <div className="flex flex-wrap justify-center h-full">
                        {tags.map((tag, index) => (
                            <div className="p-1 m-2 cursor-pointer h-max transition-all duration-100 border-solid hover:border-red-400 border-[1px] border-slate-700 rounded-md" key={index}>
                                <span onClick={() => removeTag(index)}>{tag}</span>
                                <span onClick={() => removeTag(index)}>&times;</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Save onClick={saveTags}/>
        </div>
    );
}

export default TagsInput;
