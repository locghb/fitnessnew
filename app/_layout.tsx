// app/_layout.tsx
import React, { useState, useEffect } from 'react';
import { Stack, useRouter, SplashScreen } from 'expo-router';
import { supabase } from '../lib/supabase'; // <-- Đảm bảo đường dẫn này đúng
import { Session } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar'; // Thêm StatusBar nếu bạn muốn

// Ngăn splash screen ẩn tự động
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Kiểm tra session ban đầu một lần
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Đánh dấu là đã khởi tạo xong lần đầu
      setInitialized(true);
      // Bây giờ mới ẩn splash screen
      SplashScreen.hideAsync();
    })

    // Lắng nghe các thay đổi sau này
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth Event:', event, 'Session:', !!session); // Log để debug
        setSession(session);

        // --- LOGIC ĐIỀU HƯỚNG QUAN TRỌNG ---
        if (event === 'PASSWORD_RECOVERY' && session) {
          console.log('PASSWORD_RECOVERY event detected, redirecting to confirm screen...');
          // Không cần chờ initialized ở đây, sự kiện này là ưu tiên
          router.replace('/reset-password');
        }
        // Bạn có thể thêm các điều hướng khác ở đây nếu cần
        // Ví dụ: chuyển về login khi SIGNED_OUT
        // else if (event === 'SIGNED_OUT') {
        //   router.replace('/login');
        // }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]); // Bỏ initialized khỏi dependencies ở đây

  // Không render gì cho đến khi biết trạng thái session ban đầu
  if (!initialized) {
    return null;
  }

  // Khi đã initialized, hiển thị Stack và các màn hình
  // Logic điều hướng chính dựa vào URL và các lệnh router.replace/push
  // Stack ở đây chỉ định nghĩa cấu trúc và options
  return (
    <>
      <StatusBar style="dark" /> {/* Giữ lại StatusBar của bạn */}
      <Stack>
        {/* Các màn hình của bạn */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }} />
        <Stack.Screen name="otp-verification" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}