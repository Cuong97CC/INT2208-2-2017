Feature: Find the Result 

Scenario: Tôi chọn đúng
    Given Tôi đang ở màn hình Find the Result 
    And màn hình hiển thị phép tính 7+12=?
    And Màn hình hiển thị 4 kết quả dưới phép tính là 19 22 23 14
    When Tôi chọn kết quả là 19
    Then Màn hình thông báo "Đúng rồi!"
    And Tôi được cộng thêm 1 điểm
    And Màn hình chuyển sang phép tính mới

Scenario: Tôi chọn sai
    Given Tôi đang ở màn hình Find the Result 
    And màn hình hiển thị phép tính 7+12=?
    And Màn hình hiển thị 4 kết quả dưới phép tính là 19 22 23 14
    When Tôi chọn 1 trong các kết quả là 22 23 14
    Then Màn hình thông báo "Sai mất rồi!"
    And Tôi không được cộng thêm điểm
    And Màn hình chuyển sang phép tính mới
