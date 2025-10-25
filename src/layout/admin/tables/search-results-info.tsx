interface SearchResultsInfoProps {
    searchTerm: string
    totalResults: number
    hasResults: boolean
    className?: string
  }
  
  const SearchResultsInfo = ({
    searchTerm,
    totalResults,
    hasResults,
    className = "mb-4 px-4",
  }: SearchResultsInfoProps) => {
    if (!searchTerm) return null
  
    return (
      <div className={className}>
        <p className="text-sm text-gray-600">
          {hasResults
            ? `Found ${totalResults} result${totalResults !== 1 ? "s" : ""} matching "${searchTerm}"`
            : `No results found matching "${searchTerm}"`}
        </p>
      </div>
    )
  }
  
  export default SearchResultsInfo
  