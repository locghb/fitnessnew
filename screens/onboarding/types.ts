// screens/onboarding/types.ts

export interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: any; // Lưu ý: Dùng kiểu 'any' không được khuyến khích lắm,
              // nên dùng ImageSourcePropType từ 'react-native' nếu có thể
}

// Sửa interface này:
export interface OnboardingProps {
  // Xóa dòng navigation đi
  // Nếu không còn prop nào khác, interface này có thể để trống như sau:
}
// Hoặc nếu bạn thích rõ ràng hơn là không có props:
// export type OnboardingProps = {};