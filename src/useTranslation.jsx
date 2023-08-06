import useGame from './stores/useGame';

export function useTranslation(key) {
    const language = useGame((state) => state.language);

    return key[language];
}