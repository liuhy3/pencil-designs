import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Alert.alert('登录', `用户名: ${username}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>🦐 OpenClaw</Text>
          <Text style={styles.welcomeText}>欢迎回来，请登录您的账号</Text>
        </View>

        <View style={styles.loginForm}>
          <TextInput
            style={styles.input}
            placeholder="👤 用户名 / 邮箱"
            placeholderTextColor="rgba(0,0,0,0.25)"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="🔒 密码"
            placeholderTextColor="rgba(0,0,0,0.25)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.rememberRow}>
            <Text style={styles.rememberText}>记住我</Text>
            <TouchableOpacity><Text style={styles.forgotText}>忘记密码？</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>登 录</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerSection}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>或</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#07C160' }]}>
            <Text style={styles.socialButtonText}>微信</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#12B7F5' }]}>
            <Text style={styles.socialButtonText}>QQ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerLink}>
          <Text style={styles.registerText}>还没有账号？</Text>
          <TouchableOpacity><Text style={styles.registerLinkText}>立即注册</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 24, justifyContent: 'center' },
  logoSection: { alignItems: 'center', marginBottom: 32 },
  logoText: { fontSize: 28, fontWeight: '700', color: '#1677ff', marginBottom: 8 },
  welcomeText: { fontSize: 14, color: 'rgba(0,0,0,0.45)' },
  loginForm: { marginBottom: 24 },
  input: { height: 48, backgroundColor: '#fff', borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 6, paddingHorizontal: 16, fontSize: 14, marginBottom: 16 },
  rememberRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  rememberText: { fontSize: 14, color: 'rgba(0,0,0,0.65)' },
  forgotText: { fontSize: 14, color: '#1677ff' },
  loginButton: { height: 48, backgroundColor: '#1677ff', borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  loginButtonText: { fontSize: 16, fontWeight: '500', color: '#fff' },
  dividerSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#d9d9d9' },
  dividerText: { fontSize: 14, color: 'rgba(0,0,0,0.25)', marginHorizontal: 16 },
  socialButtons: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 24 },
  socialButton: { width: 100, height: 40, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  socialButtonText: { fontSize: 14, color: '#fff' },
  registerLink: { flexDirection: 'row', justifyContent: 'center' },
  registerText: { fontSize: 14, color: 'rgba(0,0,0,0.45)' },
  registerLinkText: { fontSize: 14, color: '#1677ff' },
});