import { TRANSLATIONS } from "../../translations"
import useGame, { STAGES, LANGUAGES } from '../../stores/useGame';
import './style.css'

export default function IntroInterface()
{
    const language = useGame((state) => state.language);
    const changeStage = useGame((state) => state.changeStage);
    const onUpdateStage = useGame((state) => state.onUpdateStage);
    const changeLanguage = useGame((state) => state.changeLanguage);
    const onUpdateLanguage = useGame((state) => state.onUpdateLanguage);

    const onButtonClick = () => {
        // const changeToStage = STAGES.CHARACTER_SELECTION_STAGE;
        const changeToStage = STAGES.PLAY_STAGE;
        changeStage(changeToStage);
        onUpdateStage(changeToStage);
    };
    
    const onButtonLanguageClick = (languageId) => {
        changeLanguage(languageId);
        onUpdateLanguage(languageId);
    };

    return <div className="intro-container">
        <div className="title">
            <h1>{TRANSLATIONS.introStage[language]}</h1>
        </div>

        <button className="btn-start blinking" onClick={onButtonClick}>{TRANSLATIONS.start[language]}</button>

        <div className="languages">
            { LANGUAGES.map((language, index) => {
                return <button key={index} className="btn-language"
                    style={{
                    // backgroundImage: 'url(' + require(`@/${ language.image }`) + ')'
                    backgroundImage: `url(${language.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                onClick={() => onButtonLanguageClick(language.id)}
                >{language.name}</button>
            })}
        </div>
    </div>
}