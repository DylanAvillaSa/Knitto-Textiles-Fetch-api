import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages, toggleBookmark } from "@/redux/imageSlice";
import ImageCard from "@/components/ImageCard";
import { RootState } from "@/redux/store";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { images, bookmarks, page, hasMore, loading } = useSelector(
    (state: RootState) => state.images
  );

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchImages({ page: 1, searchTerm }));
    }
  }, [searchTerm, dispatch]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchImages({ page: page + 1, searchTerm }));
    }
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder='Search images...'
        value={searchTerm}
        onChangeText={handleSearch}
        style={{
          padding: 10,
          borderColor: "#ddd",
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ImageCard
            image={item}
            isBookmarked={bookmarks.includes(item.id)}
            onBookmark={() => dispatch(toggleBookmark(item.id))}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size='large'
              color='#0000ff'
            />
          ) : null
        }
      />
    </View>
  );
};

export default HomeScreen;
