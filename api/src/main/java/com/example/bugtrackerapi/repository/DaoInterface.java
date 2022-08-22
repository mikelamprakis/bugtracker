package com.example.bugtrackerapi.repository;

import java.util.List;

public interface DaoInterface<E> {

    void create(E e);

    E update(E e);

    void delete(E e);

    E findById(int id);

    List<? extends E> findAll();

}
