import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface ImageCardProps {
  image: any;
  isBookmarked: boolean;
  onBookmark: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  isBookmarked,
  onBookmark,
}) => {
  return (
    <View style={{ marginBottom: 20, borderRadius: 10, overflow: "hidden" }}>
      <Image
        source={{ uri: image.previewURL }}
        style={{ height: 150, width: "100%" }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{image.user}</Text>
        <Text>{image.tags}</Text>
        <TouchableOpacity
          onPress={onBookmark}
          style={{ padding: 5, marginTop: 5 }}>
          <Text style={{ color: isBookmarked ? "red" : "blue" }}>
            {isBookmarked ? "Remove Bookmark" : "Bookmark"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageCard;
