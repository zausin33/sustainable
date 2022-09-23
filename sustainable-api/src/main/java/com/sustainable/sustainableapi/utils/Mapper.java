package com.sustainable.sustainableapi.utils;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class Mapper {
    private static ModelMapper modelMapper;

    public Mapper(ModelMapper modelMapper) {
        Mapper.modelMapper = modelMapper;
    }

    public static <D> D map(Object source, Class<D> destinationType) {
        return modelMapper.map(source, destinationType);
    }
}
