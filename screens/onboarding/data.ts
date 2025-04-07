import { OnboardingItem } from './types';

export const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: 'Tập luyện theo nhu cầu',
    description: 'Các bài tập được thiết kế phù hợp với mục tiêu và thể trạng của bạn',
    image: require('../../assets/onboarding-1.png'),
  },
  {
    id: 2,
    title: 'Theo dõi dinh dưỡng',
    description: 'Ghi chép và theo dõi chế độ ăn uống hàng ngày của bạn',
    image: require('../../assets/onboarding-2.png'),
  },
  {
    id: 3,
    title: 'Cải thiện sức khỏe',
    description: 'Đạt được mục tiêu sức khỏe và thể hình của bạn một cách hiệu quả',
    image: require('../../assets/onboarding-3.png'),
  },
]; 