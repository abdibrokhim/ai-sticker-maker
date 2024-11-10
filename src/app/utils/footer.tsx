import React from 'react';

const Footer: React.FC = () => {

    return (
        <footer className="relative text-center leading-relaxed text-sm text-gray-500 text-xs">
            <div className="leftright grid grid-cols-2 lg:grid-cols-[1fr_auto] lg:gap-[300px] gap-[100px] user-select-none items-start justify-start">
                <div className="left grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <a href="mailto:abdibrokhim@gmail.com" className={`textButton flex items-center justify-start lg:justify-start my-1 transition text-[#aeaeae] hover:text-white `} target="_blank" rel="noreferrer noopener">
                    <i className="fas fa-fw fa-envelope mr-2"></i>
                    <div className="text">Contact</div>
                </a>
                <a href="https://buymeacoffee.com/abdibrokhim/" className={`textButton flex items-center justify-start lg:justify-start my-1 transition text-[#aeaeae] hover:text-white `} target="_blank" rel="noreferrer noopener">
                    <i className="fas fa-fw fa-donate mr-2"></i>
                    <div className="text">Support</div>
                </a>
                <a href="https://github.com/abdibrokhim/ai-sticker-maker" className={`textButton flex items-center justify-start lg:justify-start my-1 transition text-[#aeaeae] hover:text-white `} target="_blank" rel="noreferrer noopener">
                    <i className="fas fa-fw fa-code mr-2"></i>
                    <div className="text">Github</div>
                </a>
                <a href="https://discord.gg/nVtmDUN2sR" className={`textButton flex items-center justify-start lg:justify-start my-1 transition text-[#aeaeae] hover:text-white `} target="_blank" rel="noreferrer noopener">
                    <i className="fab fa-fw fa-discord mr-2"></i>
                    <div className="text">Discord</div>
                </a>
                <a href="https://linkedin.com/in/abdibrokhim" className={`textButton flex items-center justify-start lg:justify-start my-1 transition text-[#aeaeae] hover:text-white `} target="_blank" rel="noreferrer noopener">
                    <i className="fab fa-fw fa-linkedin mr-2"></i>
                    <div className="text">LinkedIn</div>
                </a>
                </div>
                <div className="right grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-0">
                    <a href='https://github.com/abdibrokhim/ai-sticker-maker' target="_blank" rel="noreferrer noopener" 
                        className={`current-theme textButton flex items-center justify-start lg:justify-start my-1 transition text-[#aeaeae] hover:text-white `} >
                        <i className="fas fa-fw fa-code-branch mr-2"></i>
                        <div className="text">Version:</div>
                        <span id="newVersionIndicator" className="ml-2 bg-[var(--gray-700-color)] text-[var(--white-color)] rounded-full px-2">0.1.666</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;