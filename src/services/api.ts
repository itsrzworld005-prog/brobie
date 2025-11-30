import { supabase } from '../lib/supabase';

export const api = {
  getProducts: async (categoryId?: string) => {
    let query = supabase.from('products').select('*');
    
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  getProduct: async (id: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },

  getCategories: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
      
    if (error) throw error;
    return data || [];
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    // Map Supabase user to app user structure
    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || data.user.email?.split('@')[0],
        role: data.user.user_metadata?.role || 'customer',
      }
    };
  },

  register: async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'customer',
        },
      },
    });

    if (error) throw error;
    
    return {
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: name,
        role: 'customer',
      }
    };
  },
  
  getOrders: async (userId: string | number) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  },

  getAllOrders: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  },

  createOrder: async (order: any) => {
    // 1. Insert order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: order.user_id,
        total_amount: order.total_amount,
        shipping_address: order.shipping_address,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert order items
    const items = order.items.map((item: any) => ({
      order_id: orderData.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      variant_info: item.variant_info
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(items);

    if (itemsError) throw itemsError;

    return orderData;
  },

  // Helper for backward compatibility or direct query execution if needed
  // But we should try to use specific methods
};

