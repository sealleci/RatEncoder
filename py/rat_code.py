__all__ = ('rat_encode', 'rat_decode')

cnv_dic = {
    'a': '欸弋',
    'b': '比弋',
    'c': '兮弋',
    'd': '氐弋',
    'e': '一弋',
    'f': '艾夫',
    'g': '几弋',
    'h': '艾尺',
    'i': '艾弋',
    'j': '介欸',
    'k': '克欸',
    'l': '艾了',
    'm': '艾木',
    'n': '厄恩',
    'o': '凹五',
    'p': '匹弋',
    'q': '克又',
    'r': '阿二',
    's': '艾巳',
    't': '忒弋',
    'u': '又五',
    'v': '未弋',
    'w': '大六',
    'x': '克巳',
    'y': '外弋',
    'z': '子弋',
    '0': '于令',
    '1': '士豆',
    '2': '戈川',
    '3': '公天',
    '4': '召玉',
    '5': '人午',
    '6': '刀土',
    '7': '水木',
    '8': '手另',
    '9': '王丘'
}

upper_prefix = '巨'
escape_sign = '亡'


def value2key(v):
    vlist = list(cnv_dic.values())
    if v in list(cnv_dic.values()):
        return list(cnv_dic.keys())[vlist.index(v)]
    else:
        return None


def rat_encode(str):
    res = ''
    l = len(str)
    i = 0

    while i < l:
        c = str[i]

        if c.encode('utf-8').isalpha() or c.encode('utf-8').isdigit():
            if c.isupper():
                res += upper_prefix

            res += cnv_dic[c.lower()]
        else:
            is_added = False

            if c == escape_sign or c == upper_prefix:
                res += escape_sign+c
                is_added = True
            else:
                if l-i >= 2:
                    k = value2key(str[i:i+2])
                    if k != None:
                        res += escape_sign+c+escape_sign+str[i+1]
                        is_added = True
                        i += 1

            if not is_added:
                res += c

        i += 1

    return res


def rat_decode(str):
    res = ''
    l = len(str)
    i = 0

    while i < l:
        c = str[i]
        is_added = False

        if c == escape_sign:
            if i+1 < l:
                res += str[i+1]
            i += 2
            continue

        if c == upper_prefix:
            if l-i > 2:
                k = value2key(str[i+1:i+3])
                if k != None and k.isalpha():
                    res += k.upper()
                    is_added = True
                    i += 2
        else:
            if l-i >= 2:
                k = value2key(str[i:i+2])
                if k != None:
                    res += k
                    is_added = True
                    i += 1

        if not is_added:
            res += c

        i += 1

    return res

if __name__ == "__main__":
    str='pan.baidu.com/s/1cufQ75SdluuvSbGr1On-ZQ，提取码：2eP0'
    print(str)
    str=rat_encode(str)
    print(str)
    str=rat_decode(str)
    print(str)