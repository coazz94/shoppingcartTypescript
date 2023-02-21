import { useEffect, useState } from "react"

// T = gonna by the type  or a function where we return the Type
// es kann entweder items oder set items sein, T = items[] ( array of items type)
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof initialValue === "function") {
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}
