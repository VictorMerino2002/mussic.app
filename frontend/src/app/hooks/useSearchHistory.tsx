import { useLocalStorage } from "usehooks-ts";

interface GenericItem {
    id: string;
}

export function useSearchHistory<T extends GenericItem>(key: string) {
    const [value, setter] = useLocalStorage<T[]>(`${key}-search-history`, []);

    const push = (value: T) => {
        setter(prev => {
            if (prev.some(item => item.id === value.id)) return prev;

            const newHistory = [value, ...prev];
            if (prev.length >= 10) newHistory.pop();
            return newHistory;
        });
    }

    const clear = () => {
        setter([]);
    }

    return { value, push, clear };
}