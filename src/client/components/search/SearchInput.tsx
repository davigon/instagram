import React, { ChangeEvent, useState } from "react"
import {
  Avatar,
  Box,
  HStack,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useSearch } from "../../hooks/useSearch"
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete"
import { useNavigate } from "react-router-dom"

export const SearchInput = () => {
  const [username, setUsername] = useState("")
  const { searchedUsers } = useSearch(username)

  const navigate = useNavigate()

  const handleSearchValueChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }

  const handleSearch = (username: string) => {
    navigate(`/@${username}`)
    setUsername("")
  }

  return (
    <Box rounded={"md"}>
      <AutoComplete rollNavigation>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <AutoCompleteInput
            variant="outline"
            placeholder="Buscar"
            value={username}
            onChange={handleSearchValueChange}
          />
        </InputGroup>
        <AutoCompleteList>
          {searchedUsers &&
            searchedUsers.slice(0, 15).map((searchedUser) => (
              <AutoCompleteItem
                key={`searchedUser-${searchedUser.username}`}
                value={searchedUser.username}
                onClick={() => handleSearch(searchedUser.username)}
              >
                <HStack>
                  <Avatar
                    size="md"
                    name={searchedUser.username}
                    src={"/api/cors/" + searchedUser.profilePicUrl}
                    loading={"lazy"}
                  />
                  <VStack align={"start"} spacing={0}>
                    <Text>{searchedUser.username}</Text>
                    <Text noOfLines={1}>{searchedUser.name}</Text>
                  </VStack>
                </HStack>
              </AutoCompleteItem>
            ))}
        </AutoCompleteList>
      </AutoComplete>
    </Box>
  )
}
