Feature: Whatmissing

Scenario: Tôi chọn đúng
    Given Tôi đang ở màn hình What's Missing?
    And Màn hình hiển thị 10_3=7
    When Tôi chọn dấu "-"
    Then Tôi được cộng thêm 1 điểm
    And Màn hình thông báo "Đúng rồi!"
    And Màn hình chuyển sang phép tính mới

Scenario: Tôi chọn sai
    Given Tôi đang ở màn hình What's Missing? 
    And Màn hình hiển thị 10_3=7
    When Tôi chọn dấu "+"
    Then Màn hình thông báo "Sai mất rồi!"
    And Tôi không được cộng thêm điểm
    And Màn hình chuyển sang phép tính mới
