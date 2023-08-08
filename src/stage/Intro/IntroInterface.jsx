import { TRANSLATIONS } from "../../translations"
import useGame, { STAGES, LANGUAGES } from '../../stores/useGame';
import { useTranslation } from "../../utils/useTranslation";
import './style.css'

export default function IntroInterface()
{
    const changeStage = useGame((state) => state.changeStage);
    const onUpdateStage = useGame((state) => state.onUpdateStage);
    const changeLanguage = useGame((state) => state.changeLanguage);
    const onUpdateLanguage = useGame((state) => state.onUpdateLanguage);

    const onStartClick = () => {
        // const changeToStage = STAGES.CHARACTER_SELECTION_STAGE;
        const changeToStage = STAGES.PLAY_STAGE;
        changeStage(changeToStage);
        onUpdateStage(changeToStage);
    };
    
    const onButtonLanguageClick = (languageId) => {
        changeLanguage(languageId);
        onUpdateLanguage(languageId);
        onStartClick();
    };

    return <div className="intro-container">
        <div className="title">
            <h1>{useTranslation(TRANSLATIONS.introStage)}</h1>
        </div>

        {/* <button className="btn-start blinking" onClick={onStartClick}>{useTranslation(TRANSLATIONS.start)}</button> */}

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